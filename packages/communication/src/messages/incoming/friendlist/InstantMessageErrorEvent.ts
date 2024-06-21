import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { InstantMessageErrorParser } from '../../parser';

export class InstantMessageErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InstantMessageErrorParser);
    }

    public getParser(): InstantMessageErrorParser
    {
        return this.parser as InstantMessageErrorParser;
    }
}
