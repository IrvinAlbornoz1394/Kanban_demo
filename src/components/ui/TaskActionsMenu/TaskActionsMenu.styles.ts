import styled, { css } from "styled-components";

export const MenuContext = styled.div`
	position: absolute;
	right: -50px;
	top: 28px;
	background: ${({ theme }) => theme.colors.surface || '#fff'};
	border: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
	border-radius: 8px;
	box-shadow: 0 4px 16px rgba(0,0,0,0.10);
	z-index: 10;
	min-width: 160px;
	padding: 4px 0;
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	li {
		display: block;
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		padding: 10px 16px;
		font-size: 15px;
		border-radius: 6px;
		margin: 0;
		outline: none;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.text};
		transition: background 0.2s, color 0.2s;
		user-select: none;
		&:hover, &:focus {
			background: ${({ theme }) => theme.colors.primary}22;
		}
		&:active {
			background: ${({ theme }) => theme.colors.primary}44;
		}
	}
`;
