export interface IFactoryCore {
    start: () => Promise<void> | void
    stop: () => Promise<void> | void
}