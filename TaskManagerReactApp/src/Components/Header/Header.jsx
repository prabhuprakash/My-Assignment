import styles from 'styled-components';

const HeaderContainer = styles.div`
    text-align: center;
    margin: 1rem 0;
`;

const H1 = styles.h1`
    color: #4a4a4a;
    font-size: 2rem;
    font-weight: bold;
`;

export function Header() {
    return (
        <HeaderContainer>
            <H1>Task Manager</H1>
        </HeaderContainer>
    );
}