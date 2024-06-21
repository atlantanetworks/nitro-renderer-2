import { IGraphicAsset } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Container, Graphics, Matrix, Sprite, Texture } from 'pixi.js';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class IsometricImageFurniVisualization extends FurnitureAnimatedVisualization
{
    protected static THUMBNAIL: string = 'THUMBNAIL';

    private _thumbnailAssetNameNormal: string;
    private _thumbnailImageNormal: Texture;
    private _thumbnailDirection: number;
    private _thumbnailChanged: boolean;
    protected _hasOutline: boolean;

    constructor()
    {
        super();

        this._thumbnailAssetNameNormal = null;
        this._thumbnailImageNormal = null;
        this._thumbnailDirection = -1;
        this._thumbnailChanged = false;
        this._hasOutline = false;
    }

    public get hasThumbnailImage(): boolean
    {
        return !(this._thumbnailImageNormal == null);
    }

    public setThumbnailImages(k: Texture): void
    {
        this._thumbnailImageNormal = k;
        this._thumbnailChanged = true;
    }

    protected updateModel(scale: number): boolean
    {
        const flag = super.updateModel(scale);

        if (!this._thumbnailChanged && (this._thumbnailDirection === this.direction)) return flag;

        this.refreshThumbnail();

        return true;
    }

    private refreshThumbnail(): void
    {
        if (this.asset == null) return;

        if (this._thumbnailImageNormal)
        {
            this.addThumbnailAsset(this._thumbnailImageNormal, 64);
        }
        else
        {
            this.asset.disposeAsset(this.getThumbnailAssetName(64));
        }

        this._thumbnailChanged = false;
        this._thumbnailDirection = this.direction;
    }

    private addThumbnailAsset(k: Texture, scale: number): void
    {
        let layerId = 0;

        while (layerId < this.totalSprites)
        {
            if (this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL)
            {
                const assetName = (this.cacheSpriteAssetName(scale, layerId, false) + this.getFrameNumber(scale, layerId));
                const asset = this.getAsset(assetName, layerId);

                if (asset)
                {
                    const _local_6 = this.generateTransformedThumbnail(k, asset);
                    const _local_7 = this.getThumbnailAssetName(scale);

                    this.asset.disposeAsset(_local_7);

                    this.asset.addAsset(_local_7, _local_6, true, asset.offsetX, asset.offsetY, false, false);
                }

                return;
            }

            layerId++;
        }
    }

    protected generateTransformedThumbnail(texture: Texture, asset: IGraphicAsset): Texture
    {
        let transformedTexture: Texture;

        const scale = 1.1;
        const matrix = new Matrix();
        const difference = asset.width / texture.width;

        switch (this.direction)
        {
            case 2:
                matrix.set(difference, -0.5 * difference, 0, difference * scale, 0, 0.5 * difference * texture.height);
                break;
            case 0:
            case 4:
                matrix.set(difference, 0.5 * difference, 0, difference * scale, 0, 0);
                break;
            default:
                matrix.set(difference, 0, 0, difference, 0, 0);
        }

        const sprite = new Sprite(texture);

        sprite.setFromMatrix(matrix);
        if (this._hasOutline)
        {
            const container = new Container();
            const background = new Graphics();
            const outlineWidth = 0;


            sprite.position.set(outlineWidth, outlineWidth);
 
            container.addChild(background);
            container.addChild(sprite);
            // Crear la textura desde el contenedor
            transformedTexture = TextureUtils.generateTexture(container);
        } else
        {
            // Crear una textura directamente desde el sprite transformado
            transformedTexture = TextureUtils.generateTexture(sprite);
        }

        return transformedTexture;

    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        if (this._thumbnailImageNormal && (this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL)) return this.getThumbnailAssetName(scale);

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getThumbnailAssetName(scale: number): string
    {
        this._thumbnailAssetNameNormal = this.getFullThumbnailAssetName(this.object.id, 64);

        return this._thumbnailAssetNameNormal;
    }

    protected getFullThumbnailAssetName(k: number, _arg_2: number): string
    {
        return [this._type, k, 'thumb', _arg_2].join('_');
    }
}
