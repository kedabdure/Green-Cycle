import Center from "../components/Center"
import Header from "../components/Header"
import Footer from "../components/Footer"
import styled from "styled-components"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Image from "next/image"


const ProfileWrapper = styled.div`
  padding-top: 70px;
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
  border: 1px solid #aaa;
  margin: 0 auto;
  width: 400px;
  hight: auto;
`;

export default function Account() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session, status)

  const imageUrl = session?.user?.image;

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <ProfileWrapper>
      <Header />
      <Center>
        <Title>Profile</Title>
        <StyledForm>
          <div>
            <Image src={imageUrl} width={100} height={100} alt="user-photo" />
          </div>
        </StyledForm>
      </Center>
      <Footer />
    </ProfileWrapper>
  )
}
