import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import './MovieList.css';


class MovieList extends Component {
    newText = '';

    state = {
        movies: [],
    };


    shouldComponentUpdate(nextProps) {
        return this.props.text === nextProps.text && this.props.id === nextProps.id;
    }

    componentDidMount() {
        if (localStorage.getItem('movie') === null) return;
        let copy = this.state.movies;
        copy = JSON.parse(localStorage.getItem('movie'));
        this.setState({ movies: copy });
    }

    addBtn() {
        const id = Math.random() * 1000;
        let copy = this.state.movies;
        copy.push({ id: id, text: this.newText });
        this.setState({ movies: copy });
        localStorage.setItem('movie', JSON.stringify(copy));
    }

    addNewMovie(event) {
        this.newText = event.currentTarget.value;
    }

    editMovieName(event) {
        const id = event.currentTarget.id;
        let copy = this.state.movies;
        const index = copy.findIndex(item => item.id === parseFloat(id));
        copy[index].text = event.currentTarget.value;
        this.setState({ movies: copy })
        localStorage.setItem('movie', JSON.stringify(copy));
    }

    deleteItem(event) {
        const id = event.currentTarget.id;
        const copy = this.state.movies;
        const index = copy.findIndex(item => item.id === parseFloat(id));
        copy.splice(index, 1);
        localStorage.setItem('movie', JSON.stringify(copy));
        this.setState({ movies: copy });
    }

    render() {
        return (
            <Paper component={Box} p={2} m={2}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    component={Box} p={3}
                >
                    <form className='Movieform' noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Watch list"
                            variant="outlined"
                            onChange={this.addNewMovie.bind(this)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            component={Box} p={2} m={1}
                            type='button'
                            onClick={this.addBtn.bind(this)}
                        >
                            Add
                        </Button>
                    </form>

                </Grid>
                <Grid justifyContent="center" alignItems="center" component={Box} m={1}>
                    <Paper component={Box} p={2} container justifyContent="center" alignItems="center">
                        <p>Movie list :</p>
                        <form>
                            {this.state.movies.map((item, key) => (
                                <div id={item.id} className='inputMovies'>
                                    <TextField type='text'
                                        id={item.id}
                                        variant="outlined"
                                        key={key}
                                        value={item.text}
                                        onChange={(event) => this.editMovieName.bind(this)(event)}
                                        component={Box} m={1}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={this.deleteItem.bind(this)}
                                        component={Box} p={2} m={1}
                                        id={item.id}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </form>
                    </Paper>
                </Grid>
            </Paper>
        );
    }
}

export default MovieList;
