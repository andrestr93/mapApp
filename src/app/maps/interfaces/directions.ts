export interface DirectionsResponse {
    routes: Route[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
}

export interface Route {
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
    legs: Leg[];
    geometry: Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type: Type;
}

export enum Type {
    LineString = "LineString",
}

export interface Leg {
    via_waypoints: any[];
    admins: Admin[];
    weight: number;
    duration: number;
    steps: Step[];
    distance: number;
    summary: string;
}

export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1: string;
}

export interface Step {
    intersections: Intersection[];
    maneuver: Maneuver;
    name: Name;
    duration: number;
    distance: number;
    driving_side: DrivingSide;
    weight: number;
    mode: Mode;
    ref?: string;
    geometry: Geometry;
    exits?: string;
    destinations?: string;
    rotary_name?: string;
}

export enum DrivingSide {
    Right = "right",
    SlightRight = "slight right",
    Straight = "straight",
}

export interface Intersection {
    mapbox_streets_v8?: MapboxStreetsV8;
    classes?: ClassElement[];
    entry: boolean[];
    bearings: number[];
    duration?: number;
    admin_index: number;
    out?: number;
    weight?: number;
    geometry_index: number;
    location: number[];
    in?: number;
    turn_weight?: number;
    turn_duration?: number;
    lanes?: Lane[];
    yield_sign?: boolean;
    is_urban?: boolean;
    railway_crossing?: boolean;
}

export enum ClassElement {
    Motorway = "motorway",
    Restricted = "restricted",
    Tunnel = "tunnel",
}

export interface Lane {
    indications: DrivingSide[];
    valid: boolean;
    active: boolean;
    valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
    class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
    Motorway = "motorway",
    MotorwayLink = "motorway_link",
    Primary = "primary",
    PrimaryLink = "primary_link",
    Roundabout = "roundabout",
    Secondary = "secondary",
    SecondaryLink = "secondary_link",
    Service = "service",
    Street = "street",
}

export interface Maneuver {
    type: string;
    instruction: string;
    bearing_after: number;
    bearing_before: number;
    location: number[];
    modifier?: Modifier;
    exit?: number;
}

export enum Modifier {
    Left = "left",
    Right = "right",
    SlightRight = "slight right",
}

export enum Mode {
    Driving = "driving",
}

export enum Name {
    AutovíaDelSuroeste = "Autovía del Suroeste",
    AvenidaDeLasRazas = "Avenida de Las Razas",
    AvenidaGuadalhorce = "Avenida Guadalhorce",
    Empty = "",
}

export interface Waypoint {
    distance: number;
    name: string;
    location: number[];
}
