import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GamesState } from './../../types/Games'

const initialState: GamesState = {
	games: null,
	isLoading: false,
	status: '',
}

export const getMatchesList = createAsyncThunk('matches/list', async () => {
	const response = await fetch('http://localhost:4444/proxy/games/list')

	if (!response.ok) {
		return response.statusText
	}

	const data = await response.json()
	return data
})

export const getMatchesListByDate = createAsyncThunk(
	'matches/list/date',
	async (payload: string) => {
		const response = await fetch('http://localhost:4444/proxy/games/list', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ date: payload }),
		})

		if (!response.ok) {
			return response.statusText
		}

		const data = await response.json()
		return data
	}
)

export const MatchesSlice = createSlice({
	name: 'matches',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getMatchesList.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getMatchesList.fulfilled, (state, action) => {
			state.isLoading = false
			state.games = action.payload
			state.status = action.payload?.message
		})
		builder.addCase(getMatchesList.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(getMatchesListByDate.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getMatchesListByDate.fulfilled, (state, action) => {
			state.isLoading = false
			state.games = action.payload
			state.status = action.payload?.message
		})
		builder.addCase(getMatchesListByDate.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export default MatchesSlice.reducer