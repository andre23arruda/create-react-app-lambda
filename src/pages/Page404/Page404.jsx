import React, { useEffect } from 'react'
import { Link,  } from 'react-router-dom'
import { title } from '../../utils'

import './Page404.css'


export default function Page404() {
	useEffect(() => {
        title(document, '404 ERRO')
	}, [])

	return (
		<div id="notfound">
			<div class="notfound">
				<div class="notfound-404">
					<h1>Oops!</h1>
					<h2>404 - Página não encontrada</h2>
				</div>

				<Link to="/">Voltar</Link>
			</div>
		</div>
	)
}