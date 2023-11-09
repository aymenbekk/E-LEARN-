//import waves from "../../assets/waves.png";
import rocket from "../../assets/rocket image.png";
import human from "../../assets/human.svg";
import hand from "../../assets/hand.svg";
import email from "../../assets/email.png";
import site from "../../assets/globe.png";
import phone from "../../assets/phone-call.png";

import styled, { keyframes } from "styled-components";

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const ContactSection = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Waves = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: -1rem;
`;
const Hand = styled.div`
  position: absolute;
  bottom: -1rem;
  right: 0;

  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;

const Main = styled.div`
  margin: 0 15rem;
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only Screen and (max-width: 64em) {
    margin: 0 calc(5rem + 5vw);
    margin-top: 10rem;
  }
  @media only Screen and (max-width: 40em) {
    align-items: center;
    margin: 3rem calc(3rem + 3vw);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
`;

const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px var(--purple);
  border-color: var(--purple) transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`;

const Rocket = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 40em) {
    width: 50vw;
    padding-bottom: 0;
  }
`;

const Human = styled.div`
  width: 50%;
  position: absolute;
  right: 0;
  bottom: 100%;

  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;
const Email = styled.div`
  width: 10%;
  justify-content: center;
  align-content: center;
`;
const Phone = styled.div`
  width: 10%;
  justify-content: center;
  align-content: center;
`;
const Site = styled.div`
  width: 10%;
  justify-content: center;
  align-content: center;
`;

const Text = styled.h4`
  font-size: calc(0.5rem + 1vw);
  line-height: 1.5;
  color: var(--nav2);
`;
const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.5rem;
  margin-top: 1rem;
`;
const ContactText = styled.div`
  width: 50%;
  position: relative;
  @media only Screen and (max-width: 40em) {
    width: 100%;
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <Hand>
        <img src={hand} alt="" />
      </Hand>
      <Main>
        <div>
          <Title>Contact Us</Title>
          <CurvedLine />
        </div>
        <Content>
          <Rocket>
            <img src={rocket} alt="" width="400" height="400" />
          </Rocket>
          <ContactText>
            <Human>
              <img src={human} alt="" width="400" height="400" />
            </Human>

            <Text>
              <Email>
                <img src={email} alt="Email" />
              </Email>{" "}
              elearn@esi-sba.dz &nbsp;
              <Phone>
                <img src={phone} alt="phone" />
              </Phone>{" "}
              +213 48 749 453
              <Site>
                <img src={site} alt="site" />
              </Site>{" "}
              https://www.esi-sba.dz
            </Text>
            <div>
              <Circle style={{ backgroundColor: "var(--purple)" }} />
              <Circle style={{ backgroundColor: "var(--pink)" }} />
              <Circle style={{ backgroundColor: "var(--black)" }} />
            </div>
          </ContactText>
        </Content>
      </Main>
    </ContactSection>
  );
};

export default Contact;
