export interface ICallback<T> {
    (...args: T[]): void;
}

export default class Emitter<T> {
    private __callbacks: ICallback<T>[] = [];

    public subscribe(fn: ICallback<T>) {
        this.__callbacks.push(fn);
    }

    public emit(...data: T[]) {
        this.__callbacks.forEach(e => e(...data));
    }

    public unsubscribe(fn: ICallback<T>) {
        this.__callbacks = this.__callbacks.filter(_fn => _fn != fn);
    }

    public unsubscribeAll() {
        this.__callbacks = [];
    }

    public once(fn: ICallback<T>) {
        const wrapper = () => {
            this.unsubscribe(wrapper);
            fn();
        }
        this.__callbacks.push(wrapper)
    }
}
