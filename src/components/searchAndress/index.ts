
import { reactive, Ref } from 'vue';

type AutocompleteOptions = google.maps.places.AutocompleteOptions;
export function useGooglePlaceApi() {
    let geoCode = reactive({
        pocSearchLat: '',
        pocSearchLong: '',
        address: ''
    });
    
    const options: AutocompleteOptions = {
        fields: ["place_id", "formatted_address", "geometry", "name"],
        types: ["address"],
        componentRestrictions: { country: 'br' }
    };

    function startAutoComplete(elemnt: Ref<HTMLInputElement | null>) {
        const autoComplete = new google.maps.places.Autocomplete(elemnt.value!, options);
        
        autoComplete.addListener('place_changed', async () => {
            const place = autoComplete.getPlace();
            const { lat, lng } = place.geometry?.location?.toJSON() as { lat: number, lng: number }; 
            
            geoCode.address = place.formatted_address ?? '';
            geoCode.pocSearchLat = lat.toString();
            geoCode.pocSearchLong = lng.toString();
        });

    }

    function clearGeoData() {
        geoCode.pocSearchLat = '';
        geoCode.pocSearchLong = '';
    }

    return {
        startAutoComplete,
        geoCode,
        clearGeoData,
    }
}