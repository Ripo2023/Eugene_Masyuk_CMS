import React, { useRef, useState } from "react";
import { StatusBar, FlatList, ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import {
	BLACK_COLOR,
	GRAY_COLOR,
	ORANGE_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../shared/config";
import { IOrder, getAllOrders } from "../../entities/user";
import { Loader, Text } from "../../shared/ui";
import { OrderModal } from "../../widgets/order-modal";
import { useLoadData } from "../../shared/lib";
import Map from "../../shared/assets/icons/MapPin.svg";
import Logo from "../../shared/assets/icons/logo.svg";
import { MapModal } from "../../widgets/map-modal/ui";

export const OrdersScreen: React.FC = () => {
	const [orders, setOrders] = React.useState<Nullable<IOrder[]>>(null);
	const activeOrderRef = useRef<Nullable<IOrder>>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenMap, setIsOpenMap] = useState(false);

	const handleToggleMapModal = () => {
		setIsOpenMap(!isOpenMap);
	};

	const handleToggleModal = () => {
		setIsOpenModal(!isOpenModal);
	};
	const handleLoadData = async () => {
		const result = await getAllOrders();

		setOrders(result);
	};

	const handlePressOrder = (data: IOrder) => {
		activeOrderRef.current = data;
		handleToggleModal();
	};

	const renderItem = ({ item }: ListRenderItemInfo<IOrder>) => {
		return (
			<OrderWrapper onPress={() => handlePressOrder(item)}>
				<OrderImage source={{ uri: item.image }} />
				<Text color={WHITE_COLOR}>{item.id}</Text>
			</OrderWrapper>
		);
	};

	const headerComponent = () => {
		return (
			<HeaderWrapper>
				<Title size={Spacer.EXTRA_LARGE}>Orders List</Title>
				<LogoWrapper onPress={handleToggleMapModal}>
					<Logo />
					<LogoInfo>
						<LogoName color="#636466">Coffee shop address</LogoName>
						<LogoAddress>
							<Map /> 43, Marathon st.
						</LogoAddress>
					</LogoInfo>
				</LogoWrapper>
			</HeaderWrapper>
		);
	};

	const { isLoading } = useLoadData({ loadData: handleLoadData });

	const emptyListComponent = () => {
		if (!isLoading) {
			return (
				<EmptyWrapper>
					<Text
						size={Spacer.LARGE}
						color={GRAY_COLOR}
					>
						Nothing to show you. Create your first order
					</Text>
				</EmptyWrapper>
			);
		}

		return <></>;
	};

	return (
		<Wrapper>
			<StatusBar
				backgroundColor={WHITE_COLOR}
				barStyle="dark-content"
			/>

			{isLoading && <Loader />}

			<FlatList
				data={orders}
				ListHeaderComponent={headerComponent}
				renderItem={renderItem}
				ListEmptyComponent={emptyListComponent}
				contentContainerStyle={{ marginHorizontal: Spacer.MEDIUM }}
			/>
			{activeOrderRef.current && (
				<OrderModal
					visible={isOpenModal}
					onClose={handleToggleModal}
					data={activeOrderRef.current}
				/>
			)}
			{isOpenMap && (
				<MapModal
					isVisible={isOpenMap}
					handleCloseModal={handleToggleMapModal}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
`;

const OrderWrapper = styled.TouchableOpacity`
	width: 100%;
	height: 100px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 ${Spacer.LARGE}px 0 ${Spacer.SMALL}px;
	background: ${BLACK_COLOR};
	margin-bottom: ${Spacer.SMALL}px;
	border-radius: 10px;
`;

const OrderImage = styled(FastImage)`
	width: 80px;
	height: 80px;
	background: ${WHITE_COLOR};
	border-color: ${ORANGE_COLOR};
	border-width: 1px;
	border-radius: 10px;
`;

const Title = styled(Text)`
	margin-top: ${Spacer.EXTRA_LARGE}px;
`;

const EmptyWrapper = styled.View``;

const HeaderWrapper = styled.View`
	margin-bottom: ${Spacer.MEDIUM}px;
`;

const LogoWrapper = styled.Pressable`
	flex-direction: row;
	margin: ${Spacer.LARGE}px ${Spacer.MEDIUM}px;
	background: white;
`;

const LogoInfo = styled.View`
	margin-left: ${Spacer.MEDIUM}px;
`;

const LogoAddress = styled(Text)`
	flex-direction: row;
	align-items: center;
	color: #2a2a2b;
	font-weight: 500;
`;

const LogoName = styled(Text)`
	margin-bottom: 3px;
`;
