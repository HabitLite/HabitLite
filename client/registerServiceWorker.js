import b64ToUint8Ary from 'url-base64-to-uint8array'

const applicationServerKey = b64ToUint8Ary("BGb5SlHD_NWF3I6r-8OOBXIPM1wIxEpHnclgV1DW5LhY7vyGTOEB-bj0YuQ1SrAxHpTmjv3ZtRGu30BB7q_0mto")

export default async () => {
    if (false && navigator.serviceWorker.controller)
        return console.log('Service worker already registered.')
    const reg = await navigator
        .serviceWorker
        .register('service-worker.js', {
            scope: './'
        })
    console.log(
        'Service worker has been registered for scope:' + reg.scope);
    const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
    })
    console.log('Push manager endpoint:', sub.endpoint)
}