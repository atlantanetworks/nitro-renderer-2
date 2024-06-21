import { RoomObjectVariable } from '@nitrots/api';
import { GetConfiguration } from '@nitrots/configuration';
import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureExternalImageVisualization extends FurnitureDynamicThumbnailVisualization
{
    private _url: string;
    private _typePrefix: string;

    constructor()
    {
        super();

        this._url = null;
        this._typePrefix = null;
    }

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        if(this._url) return this._url;

        const jsonString = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        if(!jsonString || jsonString === '') return null;

        if(this.object.type.indexOf('') >= 0)
        {
            this._typePrefix = (this.object.type.indexOf('') >= 0) ? '' : 'postcards/selfie/';
        }

        const json = JSON.parse(jsonString);

        const id = (json.id || '');
        if (id !== '') this._url = this.buildThumbnailUrl(id);
        return null;
    }

    private buildThumbnailUrl(url: string): string
    {
        const thumbnUrl = GetConfiguration().getValue<string>('camera.preview.thumbnail', '');
        let resultUrl = thumbnUrl + url;

        resultUrl = resultUrl.replace(".png", "_small.png");

        if (resultUrl.indexOf(".png") === -1)
        {
            resultUrl = (resultUrl + "_small.png");
        }

        return resultUrl;
    }
}
