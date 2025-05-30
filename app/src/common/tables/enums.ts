export const GENDERS = [
    "Male",
    "Female",
] as const
export type Gender = typeof GENDERS[number]

export const SECURITY_LEVELS = [
    "Low",
    "Medium",
    "High",
    "Maximum",
] as const
export type SecurityLevel = typeof SECURITY_LEVELS[number]

export const PERSONNEL_TYPES = [
    "Director",
    "Guard",
    "Technician",
    "Janitor",
    "Librarian",
] as const
export type PersonnelType = typeof PERSONNEL_TYPES[number]

export const DEVICE_TYPES = [
    "Camera",
    "Alarm",
    "Lock",
    "Computer",
    "Metal detector",
] as const
export type DeviceType = typeof DEVICE_TYPES[number]

export const GOOD_TYPES = [
    "Food",
    "Weapons",
    "Medical supplies",
    "Utensils",
] as const
export type GoodType = typeof GOOD_TYPES[number]
