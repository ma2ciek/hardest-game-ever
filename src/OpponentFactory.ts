import LinearOpponent  from './LinearOpponent';
import OrbitalOpponent from './OrbitalOpponent';
import {Entity} from './Level';

export interface BasicOpponentDictionary {
    orbital?: any[];
    linear?: any[];
    [name: string]: any;
}

export default class OpponentFactory {
    public createOpponents(opponents: BasicOpponentDictionary) {
        const result: Entity[] = [];
        for (const type in opponents) {
            for (const opponentOptions of opponents[type]) {
                result.push(this.createOpponent(type, opponentOptions))
            }
        }
        return result;
    }

    public createOpponent(type: string, opponentOptions: any[]): Entity {
        switch (type) {
            // case 'normal':
            //     return new LinearOpponent(<LinearOpponentOptions>opponentOptions);

            case 'orbital':
                return new OrbitalOpponent(opponentOptions);

            default:
                throw new Error('missing constructor for type: ' + type);
        }
    }
}
