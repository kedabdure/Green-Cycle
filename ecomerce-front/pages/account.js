import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Center from "../components/Center"
import Header from "../components/Header"
import Footer from "../components/Footer"
import styled from "styled-components"
import Image from "next/image"
import Button from "../components/Button"
import { CircularProgress } from "@mui/material"


const ProfileWrapper = styled.div`
  padding-top: 70px;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 40px 0 10px 0;
  font-weight: 600;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const StyledForm = styled.form`
  margin: 0 auto;
  width: 500px;
  hight: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: "1rem";
  padding: 0.75rem;
  margin: 0.6rem 0;
  border: 1px solid #ddd;
  border-radius: 10px;

  &:disabled {
    background-color: #f3f3f3;
  }

  &:focus {
    border-color: #333;
    &::placeholder {
      color: #333;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 110px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const InputWrapper = styled.div`
  flex-grow: 1;
`;

const StyledImage = styled(Image)`
  width: 100%;
  border-radius: 10px;
`;


export default function Account() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState(session?.user?.name || '')
  const [loginInProgress, setLoginInProgress] = useState(false);

  console.log(session, status)

  const imageUrl = session?.user?.image;
  const email = session?.user?.email

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  function handleSave(e) {
    e.preventDefault()

    console.log(email, username)
    setLoginInProgress(true)
  }

  return (
    <>
      <Header />
      <ProfileWrapper>
        <Center>
          <Title>Profile</Title>
          <StyledForm onSubmit={handleSave}>
            <ImageWrapper>
              <div>
                <StyledImage src={imageUrl} width={100} height={100} alt="user-photo" />
              </div>
              <Button
                $black
                $outline
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontSize: '.85rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Edit image
              </Button>
            </ImageWrapper>
            <InputWrapper>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(ev) => {
                  setUsername(ev.target.value)
                }}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                disabled
              />
              <Button
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontSize: '.9rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                $primary
                type="submit"
                disabled={true}
              >
                {loginInProgress && <CircularProgress size={16} style={{ marginRight: ".5rem", color: "#fff" }} />} Save
              </Button>
            </InputWrapper>
          </StyledForm>
        </Center>
      </ProfileWrapper>
      <Footer />
    </>
  )
}
