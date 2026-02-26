import { authenticatedFetch } from './apiClient';

export async function getUserProfile() {
    const response = await authenticatedFetch('/user/profile');
    return response.json();
}

export async function updateUserAllergens(allergens: string[]) {
    const response = await authenticatedFetch('/user/update-allergens', {
        method: 'POST',
        body: JSON.stringify({ allergens }),
    });
    return response.json();
}