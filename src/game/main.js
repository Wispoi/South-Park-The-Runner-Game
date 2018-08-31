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
game.addAsset('btn_audiooff.png');
game.addAsset('btn_audioon.png');
game.addAsset('taco.m4a');
game.addAsset('start.png');

game.createScene('Main', {
    score: 0,
    highScore: 0,   

    init: function() {
        this.world = new game.Physics();
        this.highscore = game.storage.get("highscore", 0);
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

        this.bestText = new game.Text('High Score: ' + this.highscore);
        this.bestText.anchorCenter();    
        this.bestText.center(this.stage);
        this.bestText.addTo(this.stage);
        this.bestText.position.x = game.width /3 + 700;
        this.bestText.position.y = 50;

        var soundButton = new game.Button('btn_audioon.png', function() {
            game.audio.toggle();
        });
        soundButton.sprite.position.x = 600 + game.width /2;
        soundButton.sprite.position.y = 700;
        soundButton.sprite.addTo(this.stage); 

        this.mainSound = new game.Sound('main.wav');
        this.mainSound.loop = true;
        this.mainSound.play();
    },

    addScore: function() {
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
            },

    finalScore: function() {
        if (this.score > this.highscore) {
            game.storage.set("highscore", this.score)
        }
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

    keydown: function (e) {
        ("W" === e || "UP" === e || "SPACE" === e) && this.player.jump()
    },

    toggleSound: function() {
        game.audio.toggle();
        var e = game.audio.muted ? "btn_audiooff.png" : "btn_audioon.png";
        this.soundButton.sprite.setTexture(e)
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

        var buttonStart = new game.Button('start.png', function() {
            game.system.setScene('Main');
        });
        buttonStart.sprite.position.x = - 480 + game.width /2;
        buttonStart.sprite.position.y = 300;
        buttonStart.sprite.addTo(this.stage);   


        var soundButton = new game.Button('btn_audioon.png', function() {
            game.audio.toggle();
        });
        soundButton.sprite.position.x = 600 + game.width /2;
        soundButton.sprite.position.y = 700;
        soundButton.sprite.addTo(this.stage); 

        this.titleSound = new game.Sound('Title1.m4a');
        this.titleSound.loop = true;
        this.titleSound.play(); 

    },

    showHelp: function() {
        if (!this.hidingLogo && !this.showingLogo) {
            if (this.showingHelp) {
                if (!this.helpText) return;
                return this.helpText2.remove(), this.helpText.remove(), this.helpTextTimer.clear(), this.helpText = null, this.showLogo(), this.showingHelp = !1, this.closeButton.remove(), this.helpButton.fadeIn(), this.startButton.fadeIn(), void this.soundButton.fadeIn()
            }
            this.showingHelp = !0, this.helpButton.fadeOut(0, !0), this.startButton.fadeOut(0, !0), this.soundButton.fadeOut(0, !0), this.closeButton = new game.Button("btn_close.png", game.width / 2, game.height - 60), this.closeButton.bounceIn(100), this.closeButton.addTo(this.uiContainer), this.closeButton.callback = this.showHelp.bind(this), this.closeButton.rotate(!0), this.hideLogo(this.showHelpText.bind(this))
        }
    },
    showHelpText: function() {
        var e = ["CODE / GRAPHICS / MUSIC / SFX\n\nEemeli Kelokorpi", "VOICE OVER\n\nDorsey Jackson", "Made with Panda 2"],
            t = 0,
            i = new game.BouncyText(e[t], {
                font: "FontSmall",
                align: "center"
            });
        i.x = game.width / 2 - i.width / 2, i.y = game.height / 2 - i.height / 2 + 200, i.addTo(this.uiContainer), this.helpTextTimer = game.Timer.add(3e3, function() {
            e[++t] || (t = 0), i.setText(e[t]), i.x = game.width / 2 - i.width / 2, i.y = game.height / 2 - i.height / 2 + 200;
            var a = Math.round(Math.random(1, 6));
            game.audio.playSound("vo_good" + a)
        }, !0), this.helpText = i;
        var a = new game.Text("Swap two diamonds to match 3 or more.\nMatch more than 3 for more score.\n\nWhen super power meter is filled,\npush Flash button and then any diamond\nto clear all diamonds of same color.", {
            font: "FontSmall",
            align: "center"
        });
        a.x = game.width / 2 - a.width / 2, a.y = game.height / 2 - a.height / 2 - 200, a.addTo(this.uiContainer), this.helpText2 = a
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

        this.deathSound = new game.Sound('Wasted.m4a');
        this.deathSound.loop = false;
        this.deathSound.play();
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
            game.scene.finalScore()
            this.runSound = new game.Sound('run.wav');
            this.runSound.loop = true;
            this.runSound.play();
            game.scene.finalScore()
            this.particles.active = true;
            return true;
        }
        

        else if (other.collisionGroup === 2) {
            this.body.collideAgainst.length = 0;
            this.body.velocity.y = -600;
            this.body.mass = 1;
            this.sprite.stop();
            navigator.vibrate(500);
            game.scene.finalScore()
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
