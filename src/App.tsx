import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import { Button, Divider, Container, Typography } from "@mui/material"

import { apiBaseUrl } from "./constants"
import { Patient, Diagnosis } from "./types"
import diagnosisService from "./services/diagnosis"
import patientService from "./services/patients"
import PatientListPage from "./components/PatientListPage"
import PatientDetailsPage from "./components/PatientDetailsPage"

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      const patients = await patientService.getAll()
      console.log(patients)
      setPatients(patients)
    }
    const fetchDiagnoses = async () => {
      const response = await diagnosisService.getAll()
      console.log(response)
      setDiagnoses(response)
    }
    void fetchDiagnoses()
    void fetchPatientList()
  }, [])

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={
                <PatientDetailsPage patients={patients} diagnoses={diagnoses} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
