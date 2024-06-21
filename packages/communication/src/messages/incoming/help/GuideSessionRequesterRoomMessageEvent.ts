import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GuideSessionRequesterRoomMessageParser } from '../../parser';

export class GuideSessionRequesterRoomMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionRequesterRoomMessageParser);
    }

    public getParser(): GuideSessionRequesterRoomMessageParser
    {
        return this.parser as GuideSessionRequesterRoomMessageParser;
    }
}
