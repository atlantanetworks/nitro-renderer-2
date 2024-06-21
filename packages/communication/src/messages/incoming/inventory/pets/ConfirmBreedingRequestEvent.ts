import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ConfirmBreedingRequestParser } from '../../../parser';

export class ConfirmBreedingRequestEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConfirmBreedingRequestParser);
    }

    public getParser(): ConfirmBreedingRequestParser
    {
        return this.parser as ConfirmBreedingRequestParser;
    }
}
