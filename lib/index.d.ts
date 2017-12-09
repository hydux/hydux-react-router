import { History, Location } from 'history';
import { AppProps } from 'hydux';
export { History, Location };
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
export default function withReactRouter<S, A>(history: History): (app: any) => (props: AppProps<S, A>) => any;
