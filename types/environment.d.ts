declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PRIVATEKEY: string;
        }
    }
}
export { };