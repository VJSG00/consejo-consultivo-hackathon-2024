import {
  Footer,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
// import "./index.css";

const Component: React.FC = () => {
  return (
    <Footer container>
      <div>
        <FooterTitle title="Contacto" />
        <Footer.LinkGroup col >
          <Footer.Link href="#" >
            Dirección: Calle seis del barrio Santos Luzardo, Barquisimeto,
            Venezuela.
          </Footer.Link>
          <Footer.Link href="#">Número: +58 0251-2370234</Footer.Link>
        </Footer.LinkGroup>
      </div>
      <FooterLinkGroup>
        <FooterLink href="/">Inicio</FooterLink>
        <FooterLink href="/info">Quiénes somos</FooterLink>
        <FooterLink href="/preguntas">Preguntas frecuentes</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
};
export default Component;
