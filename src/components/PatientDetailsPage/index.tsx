import { useParams } from "react-router-dom"
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import TransgenderIcon from "@mui/icons-material/Transgender"
import { Typography, Box } from "@mui/material"
import { Patient } from "../../types"

interface Props {
  patients: Patient[]
}

const PatientDetailsPage = ({ patients }: Props) => {
  const { id } = useParams<{ id: string }>()
  const patient = patients.find((p) => p.id === id)

  const getGender = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <MaleIcon />
      case "female":
        return <FemaleIcon />
      case "other":
        return <TransgenderIcon />
      default:
        return null
    }
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <Box>
      <Typography>
        <b>
          {patient.name} {getGender(patient.gender)}
        </b>
      </Typography>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
    </Box>
  )
}

export default PatientDetailsPage
