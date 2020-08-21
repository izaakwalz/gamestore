import React, { useState, useRef } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import Text from './Text';
import games from './GameData';
import categoryList from '../components/Categories';

export default HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelctedCategory] = useState('All');

  const changeCategory = (category) => {
    gamesRef.current.scrollToOffset({ x: 0, y: 0 });
    setSelctedCategory(category);
  };

  const gamesRef = useRef();

  const GameItem = (game) => {
    return (
      <Game onPress={() => navigation.navigate('GameScreen', { game: game })}>
        <GameCover source={game.cover} />

        <GameInfo backgroundColor={game.backgroundColor}>
          <GameImage source={game.cover} />
          <GameTitle>
            <Text medium bold>
              {game.title}
            </Text>
            <Text>{game.teaser}</Text>
          </GameTitle>
        </GameInfo>
      </Game>
    );
  };

  return (
    <Container>
      <StatusBar backgroundColor='#343434' barStyle='light-content' />

      <Header>
        <Text large>
          Hello{' '}
          <Text large bold color='#819ee5'>
            Izaakwalz,
          </Text>
          {'\n'}
          <Text large bold>
            Best games for today
          </Text>
        </Text>
        <Avatar source={require('../assets/game.png')} />
      </Header>
      <Categories horizontal={true} showsHorizontalScrollIndicator={false}>
        {categoryList.map((category, index) => {
          return (
            <Category key={index} onPress={() => changeCategory(category)}>
              <CategoryName
                selected={selectedCategory === category ? true : false}
              >
                {category}
              </CategoryName>
              {selectedCategory === category && <CategoryDot />}
            </Category>
          );
        })}
      </Categories>
      <Games
        data={games.filter((game) => {
          return (
            game.category.includes(selectedCategory) ||
            selectedCategory === 'All'
          );
        })}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => GameItem(item)}
        ref={gamesRef}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #343434;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 32px 0px 32px;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
`;

const Categories = styled.ScrollView`
  margin-top: 32px;
  flex-grow: 0;
`;

const Category = styled.TouchableOpacity`
  align-items: center;
  margin: 0 10px;
  height: 32px;
`;

const CategoryName = styled(Text)`
  color: ${(props) => (props.selected ? '#819ee5' : '#9a9a9a')};
  font-weight: ${(props) => (props.selected ? '700' : '500')};
`;

const CategoryDot = styled.View`
  width: 10px;
  height: 5px;
  border-radius: 3px;
  background-color: #819ee5;
`;

const Games = styled.FlatList`
  margin-top: 32px;
  flex: 1;
`;

const Game = styled.TouchableOpacity`
  margin-bottom: 32px;
`;

const GameCover = styled.Image`
  height: 300px;
  width: 100%;
`;

const GameInfo = styled.View`
  margin: -50px 16px 0 16px;
  padding: 16px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
`;

const GameImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const GameTitle = styled.View`
  margin: 0 24px;
`;
