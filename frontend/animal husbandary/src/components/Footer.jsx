// Footer.js
import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #0f172a;
  color: #ffffff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    text-align: left;
  }
`;

const Section = styled.div`
  text-align: center;
  flex: 1;
`;

const Title = styled.h4`
  font-size: 18px;
  margin-bottom: 15px;
  color: #60a5fa;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;

  svg {
    color: #ffffff;
    font-size: 20px;
    transition: color 0.3s ease;

    &:hover {
      color: #60a5fa;
    }
  }
`;

const FooterBottom = styled.div`
  background-color: #1e293b;
  color: #cbd5e1;
  padding: 15px 0;
  text-align: center;
  font-size: 13px;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Section>
          <Title>Contact Us</Title>
          <Text>Email: support@fixnmeet.com</Text>
          <Text>Phone: +91 98765 43210</Text>
          <Text>Address: 123 Booking Lane, Gandhinagar, India</Text>
        </Section>
        <Section>
          <Title>Follow Us</Title>
          <SocialIcons>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </SocialIcons>
        </Section>

      </FooterContainer>

      <FooterBottom>
        © {new Date().getFullYear()} Fix-N-Meet. All rights reserved.
      </FooterBottom>
    </>
  );
};

export default Footer;
