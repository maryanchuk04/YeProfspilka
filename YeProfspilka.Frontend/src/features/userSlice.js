import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthenticateService } from "../services/AuthenticateService";
import { googleAuthenticate } from "../services/GoogleAuth";
import { UserService } from "../services/UserService";
import { MemberStatus } from "../types/memberStatus";
import { showAlert, showDefaultAlert } from "./alertSlice";
import { HttpStatusCode } from "axios";
import { AlertType } from "../types/alertTypes";
import { handleOpen } from "./loginSlice";

const initialState = {
	loading: false,
	data: {
		id: null,
		fullName: null,
		facultet: null,
		course: 2,
		status: MemberStatus.NOT_VERIFICATED,
		avatar: "",
		role: MemberStatus.NotVerified,
		email: '',
	}
}

const authService = new AuthenticateService();

const alert = {
	open: true,
	text: "",
	type: AlertType.SUCCESS,
	duration: 4000
}

export const googleAuthenticateThunk = createAsyncThunk(
	"user/authenticate",
	async (googleToken, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const googleResponse = await googleAuthenticate(googleToken);

			const { name, picture, email, hd } = googleResponse;

			const status = await authService.authenticateGoogle({ name, picture, email, hd });

			if (status === HttpStatusCode.Created) {
				alert.text = "Ваш аккаунт було успішно створено!"
				dispatch(showAlert(alert))
			}

			if (status === HttpStatusCode.Ok) {
				alert.text = "З поверненням!"
				dispatch(showAlert(alert))
			}

			dispatch(fetchUserThunk());
			dispatch(handleOpen())
			return fulfillWithValue();
		}
		catch (error) {

			alert.type = 'error';
			alert.text = "Щось пішло не так! :("
			dispatch(showAlert(alert));
			return rejectWithValue(null);
		}
	}
)

export const fetchUserThunk = createAsyncThunk(
	"user/fetchUser",
	async (_, { fulfillWithValue, rejectWithValue, dispatch }, service = new UserService()) => {
		try {
			const userResponse = await service.get();

			return fulfillWithValue(userResponse.data);
		}
		catch (error) {
			dispatch(showDefaultAlert());
			return rejectWithValue(null)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {

	},
	extraReducers: {
		[googleAuthenticateThunk.pending]: (state) => {
			state.loading = true
		},
		[googleAuthenticateThunk.fulfilled]: (state) => {
			state.loading = false;
		},
		[googleAuthenticateThunk.rejected]: (state) => {
			state.loading = false;
		},
		[fetchUserThunk.pending]: (state) => {
			state.loading = true;
		},
		[fetchUserThunk.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		[fetchUserThunk.rejected]: (state) => {
			state.loading = false;
		}
	}
})

export const selectIsAuthorized = (state) => state.user.autorized;

export const selectUserData = (state) => state.user.data;

export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
