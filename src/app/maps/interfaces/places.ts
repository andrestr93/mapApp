export interface PlacesResponse {
    type: string;
    features: Feature[];
    attribution: string;
}

export interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    mapbox_id: string;
    feature_type: string;
    full_address: string;
    name: string;
    name_preferred: string;
    coordinates: Coordinates;
    additional_feature_types?: string[];
    place_formatted: string;
    bbox?: number[];
    context: Context;
}

export interface Context {
    region: Region;
    country: Country;
    place: District;
    district?: District;
    locality?: District;
    street?: Postcode;
    postcode?: Postcode;
}

export interface Country {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    country_code: string;
    country_code_alpha_3: string;
    translations: Translations;
}

export interface Translations {
    es: Es;
}

export interface Es {
    language: Language;
    name: string;
}

export enum Language {
    Es = "es",
    Fr = "fr",
}

export interface District {
    mapbox_id: string;
    name: string;
    wikidata_id?: string;
    translations: Translations;
}

export interface Postcode {
    mapbox_id: string;
    name: string;
}

export interface Region {
    mapbox_id: string;
    name: string;
    translations: Translations;
    wikidata_id: string;
    region_code?: string;
    region_code_full?: string;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}
