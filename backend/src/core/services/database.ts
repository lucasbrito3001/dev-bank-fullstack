import { connect, disconnect } from 'mongoose'
import databaseConfig from '@configs/database.json'

export const createDatabaseConnection = () => {
    async function start() {
        try {
            console.log('[DATABASE] > Connecting...')
            await connect(databaseConfig.qa.connectionString)
            console.log('[DATABASE] > The database was connected successfully')
        } catch (error) {
            console.log(`[DATABASE] > Have an error to connect to the database \n${error}`)
        }

        return
    }

    async function stop() {
        try {
            console.log('[DATABASE] > Disconnecting...')
            await disconnect()
            console.log('[DATABASE] > The database was disconnected successfully')
        } catch (error) {
            console.log(`[DATABASE] > Have an error to disconnect to the database \n${error}`)
        }

        return
    }

    return { start, stop }
}