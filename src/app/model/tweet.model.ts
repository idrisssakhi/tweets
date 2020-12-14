import {User} from './user.model';

export class Tweet {
    created_at? = '';
    id? = 0;
    text? = '';
    truncated? = false;
    entities? = '';
    source? = '';
    user?: User = new User()
    constructor() {}
}