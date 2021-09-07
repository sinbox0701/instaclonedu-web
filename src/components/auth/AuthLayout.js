import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

function AuthLayout({children}) {
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
        </Container>
    );
}

export default AuthLayout;

//{children}
//<AuthLayout>...</AuthLayout>
//위 처럼 AuthLayout태그 안에 들어가는 모든 내용은 {children}으로 전달할 수 있다.