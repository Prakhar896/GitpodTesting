import random

class Monster:
    def __init__(self, name, health, attack, defence) -> None:
        self.__name = name
        self.__health = health
        self.__attack = attack
        self.__defence = defence

    def setName(self, name):
        self.__name = name
    
    def setHealth(self, health):
        self.__health = health
    
    def setAttack(self, attack):
        self.__attack = attack
    
    def setDefence(self, defence):
        self.__defence = defence
    
    def getName(self):
        return self.__name

    def getHealth(self):
        return self.__health

    def getAttack(self):
        return self.__attack
    
    def getDefence(self):
        return self.__defence
    
    def health_damage(self, attack_value):
        netDamage = attack_value - self.__defence
        self.__health -= netDamage

        print("{} suffers {} damage, the health is {} now".format(self.getName(), netDamage, self.getHealth()))
    
    def __str__(self) -> str:
        return "{} is a Monster".format(self.getName())

class FireMonster(Monster):
    def __init__(self) -> None:
        super().__init__("firebug", 10, 9, 4)

    def __str__(self) -> str:
        return "{} is a Fire Type monster".format(self.getName())

class WaterMonster(Monster):
    def __init__(self) -> None:
        super().__init__("waterbird", 15, 6, 3)

    def __str__(self) -> str:
        return "{} is a Water Type monster".format(self.getName())

class GrassMonster(Monster):
    def __init__(self) -> None:
        super().__init__("grasshopper", 20, 5, 3)

    def __str__(self) -> str:
        return "{} is a Grass Type monster".format(self.getName())

class MonsterGame:
    monsterTypes = {
        "F": FireMonster(),
        "W": WaterMonster(),
        "G": GrassMonster()
    }
    
    def __init__(self):
        self.player_monster = None
        self.computer_monster = None
        
        self.choose_monster()
        print("Player: {}".format(self.player_monster.getName()))
        self.generate_monster()
        print("Computer: {}".format(self.computer_monster.getName()))

    def choose_monster(self):
        type = input("Choose your monster (F, W or G): ").upper()
        self.player_monster = MonsterGame.monsterTypes[type]
    
    def generate_monster(self):
        self.computer_monster = MonsterGame.monsterTypes[random.choice([x for x in MonsterGame.monsterTypes])]

    def play(self):
        turn = "player"
        while (self.player_monster.getHealth() > 0) and (self.computer_monster.getHealth() > 0):
            if turn == "player":
                self.computer_monster.health_damage(self.player_monster.getAttack())
                turn = "computer"
            else:
                self.player_monster.health_damage(self.computer_monster.getAttack())
                turn = "player"
        
        if self.player_monster.getHealth() <= 0:
            print("You lost!")
        else:
            print("You won!")