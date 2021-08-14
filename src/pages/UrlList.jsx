import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import { getApi } from '../services/api'
import { title, formatDate } from '../utils'

const columns = [
	{ id: 'id', label: 'ID', minWidth: 170 },
	{ id: 'result_url', label: 'URL encurtada', minWidth: 170 },
	{ id: 'long_url', label: 'URL original', minWidth: 170 },
	{ id: 'is_valid', label: 'Válido', minWidth: 170, format: (value) => `${value}` },
	{ id: 'registered_at', label: 'Cadastrado em', minWidth: 170 },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
	marginTop: '50px'
  },
  container: {
    maxHeight: 440,
  },
  onRight: {
	  position: 'absolute',
	  right: '20px'
  }
})


export default function UrlList() {
	useEffect(() => {
        title(document, 'Lista de URLs')
	}, [])

	const classes = useStyles()
	const auth = localStorage.getItem('auth')
	const history = useHistory()
	if (!auth) { history.push('') }

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [urlList, setUrlList] = useState([])

	async function loadUrlList() {
        const response = await getApi('api/m2b/', auth)
        if (response) {
            setUrlList(response)
        }
    }

    useEffect( () => {
        loadUrlList()
    }, [])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	function logout() {
		localStorage.clear()
		history.push('/')
	}

	return (
		<Container component="main">
			<CssBaseline />

			<AppBar position="static">
				<Toolbar>
					<Button className={ classes.onRight } color="inherit" onClick={ logout }>
						Sair
					</Button>
				</Toolbar>
			</AppBar>

			<h1 align=" center"component="h1" variant="h5">
				Lista de URLS encurtadas
			</h1>

			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									<strong>{column.label}</strong>
								</TableCell>
							))}
							</TableRow>
						</TableHead>

						<TableBody>
							{ urlList.length > 0 && (
								urlList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((url) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={url.id}>
											<TableCell>
												{ url.id }
											</TableCell>

											<TableCell>
												<a href={ url.result_url }>{ url.result_url }</a>
											</TableCell>

											<TableCell>
												<a href={ url.long_url }>{ url.long_url }</a>
											</TableCell>

											<TableCell>
												{ url.is_valid ? 'Sim' : 'Não' }
											</TableCell>

											<TableCell>
												{ formatDate(url.registered_at) }
											</TableCell>
										</TableRow>
									)
								}))
							}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={urlList.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					labelRowsPerPage="Itens por página"
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>

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