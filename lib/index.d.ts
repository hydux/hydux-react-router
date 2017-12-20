import { Switch } from 'react-router';
import { History, Location } from 'history';
import { App, Init, View, Subscribe, OnUpdate } from 'hydux';
import { ActionsType } from 'hydux/lib/types';
export { History, Location, Switch };
export declare type RouterActions<Actions> = Actions & {
    history: {
        push(path: string, state?: any): void;
        replace(path: string, state?: any): void;
        go(n: number): void;
        goBack(): void;
        goForward(): void;
    };
};
export declare type RouterState<State> = State & {
    location: Location;
};
export declare function ConnectedSwitch(props: any, {router}: {
    router: any;
}): any;
export declare type PropsWithRouter<State, Actions> = {
    init: Init<State, Actions>;
    view: View<State, RouterActions<Actions>>;
    actions: ActionsType<State, RouterActions<Actions>>;
    subscribe?: Subscribe<State, Actions>;
    onRender?: (view: any) => void;
    onError?: (err: Error) => void;
    onUpdate?: OnUpdate<State, Actions>;
};
export default function withReactRouter<S, A>(history: History): (app: App<RouterState<S>, RouterActions<A>>) => (props: PropsWithRouter<S, A>) => any;
