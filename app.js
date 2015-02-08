"use strict";

var express = require('express'),
    Feed    = require('feed'),
    fs      = require('fs'),
    posts   = JSON.parse(fs.readFileSync(__dirname + '/posts.json')),
    route   = express.Router(),
    app     = express(),
    port    = process.env.PORT || 3000;

route.get('/', function (req, res) {
    res.redirect(301, '/rss');
});

route.get('/rss', function (req, res) {
    var feed = new Feed({
        title:       'Pinceladas da Web - Aprenda HTML5, CSS3, Javascript e mais',
        description: 'Blog pessoal do Desenvolvedor Web Pedro Rogério com foco em HTML5, CSS, JavaScript, Acessibilidade, Usabilidade, Arquitetura de Informação, SEO e WebStandards.',
        link:        'http://www.pinceladasdaweb.com.br/blog/',
        image:       'http://www.pinceladasdaweb.com.br/blog/wp-content/themes/pw-v4/images/logo.png',
        copyright:   'Copyright © 2015 Pinceladas da Web. Todos os direitos reservados',

        author: {
            name:  'Pedro Rogério',
            email: 'pedrorogerio@pinceladasdaweb.com.br',
            link:  'http://www.pinceladasdaweb.com.br/blog/'
        }
    });

    posts.forEach(function (post) {
        feed.addItem({
            title: post.title,
            link : post.link,
            description : post.description,
            content : post.description,
            date : new Date(post.date),
            image : post.image,
            author: [
                {
                    name: post.author[0].name,
                    email: post.author[0].email,
                    link: post.author[0].link
                }
            ]
        });
    });

    res.set('Content-Type', 'text/xml');
    res.send(feed.render('rss-2.0'));
});

app.use('/', route);

app.listen(port, function () {
    console.log('Your server goes on localhost:' + port);
});