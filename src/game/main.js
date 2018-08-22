game.module(
    'game.main'
)
.body(function() {
game.addAsset('bg.jpg');
game.addAsset('bg.png');
game.addAsset('obstacle.png');
game.addAsset('bonus.png');
game.addAsset('player.atlas');
game.addAsset('button.png');
game.addAsset('button1.png');
game.addAsset('button2.png');
game.addAsset('font.fnt');
game.addAsset('jump.wav');
game.addAsset('logo.png');
game.addAsset('death.png');
game.addAsset('particle.png');
game.addAsset('run.wav');
game.addAsset('main.wav');
game.addAsset('Title1.m4a');
game.addAsset('Wasted.m4a');
game.addAsset('soundbutton.png');
game.addAsset('taco.m4a');

game.createScene('Main', {
    score: 0,
    highScore: 0,   

    init: function() {
        this.world = new game.Physics();
        this.world.gravity.y = 2000;
        
        var body = new game.Body();
        var shape = new game.Rectangle();
        shape.width = game.width;
        shape.height = 60;
        body.position.x = game.width / 2;
        body.position.y = game.height - 30;
        body.collisionGroup = 1;
        body.static = true;
        body.addShape(shape);
        body.addTo(this.world);

        this.bgstatic = new game.TilingSprite('bg.jpg');
        this.bgstatic.addTo(this.stage);

        this.bg = new game.TilingSprite('bg.png');
        this.bg.addTo(this.stage);

       

        this.obstacleLayer = new game.Container();
        this.playerLayer = new game.Container();
        this.bonusLayer = new game.Container();
        this.obstacleLayer.addTo(this.stage);
        this.playerLayer.addTo(this.stage);
        this.bonusLayer.addTo(this.stage);

        this.player = new game.Player();
        this.player.sprite.addTo(this.playerLayer);

        game.Timer.add(2000, this.spawnObstacle.bind(this), true);

        game.Timer.add(5500, this.spawnBonus.bind(this), true);

        this.scoreText = new game.Text('Score: 0');
        this.scoreText.anchorCenter();    
        this.scoreText.center(this.stage);
        this.scoreText.addTo(this.stage);
        this.scoreText.position.x = game.width /3 - 300;
        this.scoreText.position.y = 50;

        this.highScoreText = new game.Text('High Score: 0');
        this.highScoreText.anchorCenter();    
        this.highScoreText.center(this.stage);
        this.highScoreText.addTo(this.stage);
        this.highScoreText.position.x = game.width /3 + 700;
        this.highScoreText.position.y = 50;


        this.mainSound = new game.Sound('main.wav');
        this.mainSound.loop = true;
        this.mainSound.play();
    },

    addScore: function() {
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
            },

    highScore: function() {
        if (score > highScore)
        this.highScore = this.score;
    },

    addBonus: function() {
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    },

    spawnObstacle: function() {
        var obstacle = new game.Obstacle();
    },

    spawnBonus: function() {
        var bonus = new game.Bonus();
    },

    mousedown: function () {
        this.player.jump();
    },

    keydown: function (e) {
        this.player.jump()
    },

    update: function() {
        this.bg.tilePosition.x -= 500 * game.delta;
        this.bgstatic.tilePosition.x -= 20 * game.delta;
    }
});

game.createScene('Title', {
    init: function() {
        var logo = new game.Sprite('logo.png');
        logo.anchorCenter();    
        logo.center(this.stage);
        logo.addTo(this.stage);

        this.startText = new game.Text('Press any key to start');
        this.startText.anchorCenter();    
        this.startText.center(this.stage);
        this.startText.addTo(this.stage);
        this.startText.position.x = game.width /1.3;
        this.startText.position.y = 700;
        this.startText.scale.x = 0;
        this.startText.scale.y = 0;

        var tween = new game.Tween(this.startText.scale);
        tween.to({
            x:1.0,
            y:1.0
        }, 500);
        tween.easing('Sinusoidal.Out');
        tween.start(); 

        this.titleSound = new game.Sound('Title1.m4a');
        this.titleSound.loop = true;
        this.titleSound.play(); 

    },

    mousedown: function () {
        game.system.setScene('Main');
    },

    keydown: function (e) {
        game.system.setScene('Main');
    }
});

game.createScene('Death', {
    init: function() {
        var logo = new game.Sprite('death.png');
        logo.anchorCenter();    
        logo.center(this.stage);
        logo.addTo(this.stage);

        var button = new game.Button('button1.png', function() {
            game.system.setScene('Main');
        });
        
        button.sprite.position.x = 90 + game.width /2;
        button.sprite.position.y = 660;
        button.sprite.addTo(this.stage);

        var buttonexit = new game.Button('button2.png', function() {
            game.system.setScene('Title');
        });
        
        buttonexit.sprite.position.x = - 90 + game.width /2;
        buttonexit.sprite.position.y = 660;
        buttonexit.sprite.addTo(this.stage);    

        this.scoreText = new game.Text('Score: 0');
        this.scoreText.anchorCenter();    
        this.scoreText.center(this.stage);
        this.scoreText.addTo(this.stage);
        this.scoreText.position.x = game.width /2;
        this.scoreText.position.y = 490;

        this.highScoreText = new game.Text('High Score: 0');
        this.highScoreText.anchorCenter();    
        this.highScoreText.center(this.stage);
        this.highScoreText.addTo(this.stage);
        this.highScoreText.position.x = game.width /2;
        this.highScoreText.position.y = 560;

        this.deathSound = new game.Sound('Wasted.m4a');
        this.deathSound.loop = false;
        this.deathSound.play();
    },

    addScore: function() {
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }
});    

game.createClass('Button', {
    init: function(texture, callback) {
        this.callback = callback;
        this.sprite = new game.Sprite(texture);
        this.sprite.anchorCenter();
        this.sprite.interactive = true;
        this.sprite.mousedown = this.mousedown.bind(this);
        this.sprite.mouseup = this.mouseup.bind(this);
        this.sprite.mouseupoutside = this.mouseup.bind(this);
        this.sprite.click = this.click.bind(this);
    },
    mousedown: function() {
        this.sprite.scale.x = 0.9;
        this.sprite.scale.y = 0.9;
    },
    mouseup: function() {
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;
    },
    click: function() {
        if(typeof this.callback === 'function') this.callback();
    }
});

game.createClass('Player', {
    init: function() {
        this.sprite = new game.Animation('player.atlas');
        this.sprite.speed = 9;
        this.sprite.play();
        this.sprite.anchorCenter();

        this.body = new game.Body();
        this.body.position.y = 200;
        this.body.position.x = 300;
        this.body.collideAgainst = [1, 2, 3];
        this.body.velocityLimit.y = 1400;
        var shape = new game.Rectangle();
        shape.width = this.sprite.width;
        shape.height = this.sprite.height;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);

        this.body.collide = this.collide.bind(this);

        this.particles = new game.Particles('particle.png');
        this.particles.position.x = 300;
        this.particles.position.y = 670;
        this.particles.speed = 500;
        this.particles.angle = Math.PI;
        this.particles.angleVar = 0.2;
        this.particles.active = false;
        this.particles.addTo(game.scene.playerLayer);

    },

    collide: function(other) {
        if (other.collisionGroup === 1) {
            this.onGround = true;
            this.body.mass = 0;
            this.body.velocity.y = 0;

            this.runSound = new game.Sound('run.wav');
            this.runSound.loop = true;
            this.runSound.play();

            this.particles.active = true;
            return true;
        }
        

        else if (other.collisionGroup === 2) {
            this.body.collideAgainst.length = 0;
            this.body.velocity.y = -600;
            this.body.mass = 1;
            this.sprite.stop();
            navigator.vibrate(500);
            game.Timer.add(2000, function() {
                game.system.setScene('Death');
            });

            this.dead = true;

            this.runSound.stop();

            this.particles.active = false;
        }
        
        else if (other.collisionGroup === 3) {

            this.give = true;
            game.scene.addBonus();
            navigator.vibrate(100);            
        }
    },

    jump: function() {
        
        if (!this.onGround || this.dead === true) return;
        this.body.velocity.y = -900;
        this.body.mass = 1;
        this.onGround = false;

        var sound = new game.Sound('jump.wav');
        sound.play();
        this.runSound.stop();

        this.particles.active = false;

    },

    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

    }
});

game.createClass('Obstacle', {
    init: function() {
        this.sprite = new game.Sprite('obstacle.png');
        this.sprite.addTo(game.scene.obstacleLayer);
        this.sprite.anchorCenter();


        this.body = new game.Body();
        var shape = new game.Rectangle();
        shape.width = this.sprite.width - 100;
        shape.height = this.sprite.height - 100;
        this.body.velocity.x = -500;
        this.body.mass = 0;
        this.body.position.x = game.width + shape.width / 2;
        this.body.position.y = game.height - 60 - shape.height / 1;
        this.body.collisionGroup = 2;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);

    },

    remove: function () {
        this.sprite.remove();
        this.body.remove();
        game.scene.removeObject(this);
        if (!game.scene.player.dead) game.scene.addScore();
    },

    update: function () {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
        if (this.sprite.position.x + this.sprite.width / 2 < 0) this.remove();
    }

});


game.createClass('Bonus', {
    init: function() {
        this.sprite = new game.Sprite('bonus.png');
        this.sprite.addTo(game.scene.bonusLayer);
        this.sprite.anchorCenter();

        this.body = new game.Body();
        var shape = new game.Rectangle();
        shape.width = this.sprite.width ;
        shape.height = this.sprite.height ;
        this.body.velocity.x = -500;
        this.body.mass = 0;
        this.body.position.x = game.width + shape.width / 2;
        this.body.position.y = game.height - 250 - shape.height / 1;
        this.body.collisionGroup = 3;
        this.body.addShape(shape);
        this.body.addTo(game.scene.world);

    },

    remove: function () {
        this.sprite.remove();
        this.body.remove();
        game.scene.removeObject(this);

    },

    update: function () {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
        if (this.sprite.position.x + this.sprite.width / 2 < 0) this.remove();
    }


    
});

window.onbeforeunload = function (evt) {
	var message = "";
	if (typeof evt == "undefined") {
		evt = window.event;
	}
	if (evt) {
		evt.returnValue = message;
	}
	return message;
}


});
