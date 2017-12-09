import { History } from 'history';
import { AppProps } from 'hydux';
export declare function ConnectedSwitch(props: any, {router}: {
    router: any;
}): any;
export default function withReactRouter<S, A>(history: History): (app: any) => (props: AppProps<S, A>) => any;
