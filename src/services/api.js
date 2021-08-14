const API_URL = `andre23arruda-m2b.herokuapp.com`
const baseUrl = `https://${ API_URL }/`


async function getApi(route, token='') {
    return fetch(baseUrl + route,
        {
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            })
        }
    )
    .then(response => {
        if (response.status < 500) {
            if (route === 'csrf/') {
                return response.headers.get('x-csrftoken')
            } else return response.json()
        } else {
            return false
        }
    })
    .catch(err => console.log(err))
}


async function postApi(route, formData, token='') {
    return fetch(
        baseUrl + route,
        {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            })
        }
    )
    .then(response => {
        if (response.status < 500){
            return response.json()
        } else {
            return false
        }
    })
    .catch(err => console.log(err))
}



export { getApi, postApi }