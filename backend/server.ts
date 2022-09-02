import createApplication from './src/core'

const app = createApplication()

try {
    app.start()
} catch (error) {
    app.stop()
}