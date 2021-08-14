import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { postApi } from '../services/api'
import { title } from '../utils'


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	result: {
		padding: '10px',
		backgroundColor: '#c9ffc9',
		border: 'none',
		borderRadius: '5px',
	}
}))

export default function NewUrl() {
	useEffect(() => {
        title(document, 'Nova URL')
	}, [])
	const classes = useStyles()
	const [long_url, setLongUrl] = useState('')
	const [result_url, setResultUrl] = useState(null)
	const history = useHistory()

	async function formSubmit(event) {
        event.preventDefault()
        const formData = {
            long_url,
        }

        const response = await postApi('api/m2b/', formData)
        if (response) {
			setResultUrl(response.result_url)
        }
    }

	function validateForm() {
        return long_url.length > 0
    }

	function goToLogin() {
		history.push('/login')
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />

			<div className={classes.paper}>
				<h2 align="center">
					Encurtar URL
				</h2>

				<form className={classes.form} onSubmit={ formSubmit }>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="long_url"
						label="URL original"
						name="long_url"
						autoComplete="long_url"
						autoFocus
						onChange={ e => setLongUrl(e.target.value) }
					/>

					{ result_url && (
						<div className={ classes.result }>
							<h4 align="center">A URL resultante é: </h4>
							<h3 align="center"><a target="_blank" rel="noopener noreferrer" href={ result_url }>{ result_url }</a></h3>
						</div>
					)}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={ classes.submit }
						disabled={ !validateForm() }
					>
						Gerar
					</Button>
				</form>


				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={ classes.submit }
					onClick={ goToLogin }
				>
					Login
				</Button>
			</div>

			<Box mt={8}>
				<Typography variant="body2" color="textSecondary" align="center">
					{'Copyright © '}
					<Link color="inherit" href="https://github.com/andre23arruda">
						André Arruda
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</Container>
	)
}