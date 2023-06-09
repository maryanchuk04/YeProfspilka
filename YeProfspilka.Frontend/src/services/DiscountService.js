import { ApiService } from './config/ApiService';

export class DiscountService {
	#apiUrl = '/discount';

	constructor() {
		this.service = new ApiService();
	}

	async getAll() {
		return await this.service.get(this.#apiUrl);
	}

	async getQrCode(discountId) {
		return await this.service.get(`discountcode/${discountId}`);
	}
}
