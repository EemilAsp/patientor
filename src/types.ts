export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">

export interface BaseHealthCareEntry {
  id: string
  date: string
  specialist: string
  diagnosisCodes: string[]
  description: string
}

export interface HospitalEntry extends BaseHealthCareEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseHealthCareEntry {
  type: "OccupationalHealthcare"
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry
