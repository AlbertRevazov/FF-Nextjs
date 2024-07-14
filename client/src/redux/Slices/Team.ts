import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GamesState } from './../../types/Games'
import { TeamsState } from '@/types/Teams'

const initialState: TeamsState = {
	team: null,
	isLoading: false,
	status: '',
}

export const getTeamById = createAsyncThunk('team/id', async (id: string) => {
	try {
		const response = await fetch(`http://localhost:4444/proxy/teams/${id}`)

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		return await response.json()
	} catch (error) {
		console.log(error)
	}
})

export const TeamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getTeamById.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getTeamById.fulfilled, (state, action) => {
			state.isLoading = false
			state.team = action.payload
			state.status = action.payload?.message
		})
		builder.addCase(getTeamById.rejected, state => {
			state.isLoading = false
		})
	},
})

export default TeamSlice.reducer