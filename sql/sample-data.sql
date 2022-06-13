INSERT INTO public.genre ("name") VALUES
	 ('SHONEN'),
	 ('SEINEN'),
	 ('ACTION'),
	 ('ROMANCE'),
	 ('HORROR');
INSERT INTO public.image ("path","name","type") VALUES
	 ('http://localhost:8080/api/images/53969.jpg?type=author','53969.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/49753.jpg?type=author','49753.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/30393.jpg?type=author','30393.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/40147.jpg?type=author','40147.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/43773.jpg?type=author','43773.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/38822.jpg?type=author','38822.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/19467.jpg?type=author','19467.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/44333.jpg?type=author','44333.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/42365.jpg?type=author','42365.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/53830.jpg?type=author','53830.jpg','image/jpeg');
INSERT INTO public.image ("path","name","type") VALUES
	 ('http://localhost:8080/api/images/10593.jpg?type=author','10593.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/917IJDfk36L.jpg?type=manga','917IJDfk36L.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/416-768x1075.jpg?type=manga','416-768x1075.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781941220856-GirlOnTheShore.jpg?type=manga','9781941220856-GirlOnTheShore.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/1591169224.jpg?type=manga','1591169224.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781632360564-768x1152.jpg?type=manga','9781632360564-768x1152.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/1569319006.jpg?type=manga','1569319006.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781612620244jpg.jpg?type=manga','9781612620244jpg.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/87572.jpg?type=manga','87572.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781647290122-LycheeLightClub-768x1024.jpg?type=manga','9781647290122-LycheeLightClub-768x1024.jpg','image/jpeg');
INSERT INTO public.image ("path","name","type") VALUES
	 ('http://localhost:8080/api/images/9781646593088-ShamanKing_01-768x1152.jpg?type=manga','9781646593088-ShamanKing_01-768x1152.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/1974717488.jpg?type=manga','1974717488.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781632363633.jpeg?type=manga','9781632363633.jpeg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781612622767-768x1152.jpg?type=manga','9781612622767-768x1152.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/ravemastervolume1-768x1143.jpeg?type=manga','ravemastervolume1-768x1143.jpeg','image/jpeg'),
	 ('http://localhost:8080/api/images/9781949980134-768x1047.jpg?type=manga','9781949980134-768x1047.jpg','image/jpeg'),
	 ('http://localhost:8080/api/images/73245.jpg?type=manga','73245.jpg','image/jpeg');
INSERT INTO public."role" ("name") VALUES
	 ('ADMIN'),
	 ('USER');
INSERT INTO public.account (address,email,"name","password",phone) VALUES
	 ('123 Street','admin@gmail.com','Admin','$2a$12$NVf0eL092tkjpsT6CFUBFOsiX30PZWUWagWxO2g/mLJ8d2BBF.53y','123456789'),
	 ('Nguyen Dinh Chieu Q3','vinh@gmail.com','Vinh','$2a$10$IHf3JM2cZADO4V3fcgY80uXBMYSeoadbomFpTYDycdY0djvRqvq0y','0772679015'),
	 ('Cao Thang Q3','xuan@gmail.com','Xuan','$2a$10$5X4N.eF67/zWcjB6hQ.3X.cgkJaH1bqVe14ccsJsP5YsL9VOtsAqW','0937063945');
INSERT INTO public.account_order (address,date_created,email,"name",order_status,phone,total_price,account_id) VALUES
	 ('Cao Thang Q3','2022-01-04 00:00:00','xuan@gmail.com','Xuan','COMPLETED','0937063945',120.00,3),
	 ('Cao Thang Q3','2022-02-02 00:00:00','xuan@gmail.com','Xuan','COMPLETED','0937063945',60.00,3),
	 ('Cao Thang Q3','2022-03-14 00:00:00','xuan@gmail.com','Xuan','COMPLETED','0937063945',117.00,3),
	 ('Cao Thang Q3','2022-04-05 00:00:00','xuan@gmail.com','Xuan','COMPLETED','0937063945',138.00,3),
	 ('Cao Thang Q3','2022-05-10 00:00:00','xuan@gmail.com','Xuan','COMPLETED','0937063945',144.00,3),
	 ('Cao Thang Q3','2022-06-13 22:17:20.156','xuan@gmail.com','Xuan','COMPLETED','0937063945',140.00,3),
	 ('Nguyen Dinh Chieu Q3','2022-07-12 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',133.00,2),
	 ('Nguyen Dinh Chieu Q3','2022-08-16 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',152.00,2),
	 ('Nguyen Dinh Chieu Q3','2022-09-27 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',85.00,2),
	 ('Nguyen Dinh Chieu Q3','2022-10-24 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',86.00,2);
INSERT INTO public.account_order (address,date_created,email,"name",order_status,phone,total_price,account_id) VALUES
	 ('Nguyen Dinh Chieu Q3','2022-11-22 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',202.00,2),
	 ('Nguyen Dinh Chieu Q3','2022-12-26 00:00:00','vinh@gmail.com','Vinh','COMPLETED','0772679015',84.00,2);
INSERT INTO public.account_roles (account_id,role_id) VALUES
	 (1,1),
	 (2,2),
	 (3,2);
INSERT INTO public.author (dob,hometown,"name",image_id) VALUES
	 ('1980-09-22 00:00:00','Ishioka, Ibaraki Prefecture, Japan','Asano Inio',1),
	 ('1981-01-01 00:00:00','Gunma Prefecture, Japan','Oshimi Shuzo',2),
	 ('1989-03-15 00:00:00','Oogaki, Gifu Prefecture, Japan','Ooima Yoshitoki',3),
	 ('1986-08-29 00:00:00','Unknown','Isayama Hajime',4),
	 ('1968-01-25 00:00:00','Tokyo, Japan','Furuya Usamaru',5),
	 ('1960-01-02 00:00:00','Japan','Urasawa Naoki',6),
	 ('1986-11-20 00:00:00','Aichi Prefecture, Japan','Horikoshi Kouhei',7),
	 ('1972-05-15 00:00:00','Yomogita, Aomori Prefecture, Japan','Takei Hiroyuki',8),
	 ('1974-11-08 00:00:00','Japan','Kishimoto Masashi',9),
	 ('1977-05-03 00:00:00','Nagano, Nagano Prefecture, Japan','Mashima Hiro',10);
INSERT INTO public.author (dob,hometown,"name",image_id) VALUES
	 ('1975-01-01 00:00:00','Kumamoto, Japan','Oda Eiichiro',11);
INSERT INTO public.book (amount_purchased,available,description,title,unit_price,author_id,image_id) VALUES
	 (0,true,'Moments prior to Naruto Uzumaki''s birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi''s rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.

Now, Naruto is a hyperactive and knuckle-headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes.','Naruto',20.00,9,17),
	 (9,true,'In a seaside town where very little happens, middle school students Keisuke Isobe and Koume Satou live a rather dull life. But when Koume''s crush breaks her heart, their situation becomes quite unordinary. She starts a "no-strings-attached" relationship with Keisuke, whom she had previously rejected, both finding solace in the other in order to fill the emotional voids in their lives. However, being "friends with benefits" becomes complicated when real feelings begin to develop, as the consequences of their relationship start to take their toll on those around them and themselves.

Umibe no Onnanoko takes a harsh look at love, relationships, and the emotional price that will be paid as the result of a decision made between two teenagers.','A Girl on the Shore',21.00,1,14),
	 (2,true,'Punpun Onodera is a normal 11-year-old boy living in Japan. Hopelessly idealistic and romantic, Punpun begins to see his life take a subtle—though nonetheless startling—turn to the adult when he meets the new girl in his class, Aiko Tanaka. It is then that the quiet boy learns just how fickle maintaining a relationship can be, and the surmounting difficulties of transitioning from a naïve boyhood to a convoluted adulthood. When his father assaults his mother one night, Punpun realizes another thing: those whom he looked up to were not as impressive as he once thought.

As his problems increase, Punpun''s once shy demeanor turns into voluntary reclusiveness. Rather than curing him of his problems and conflicting emotions, this merely intensifies them, sending him down the dark path of maturity in this grim coming-of-age saga.','Goodnight Punpun',24.00,1,12),
	 (5,true,'Kasuga Takao is a boy who loves reading books, particularly Baudelaire''s Les Fleurs du Mal. A girl at his school, Saeki Nanako, is his muse and his Venus, and he admires her from a distance. One day, he forgets his copy of Les Fleurs du Mal in the classroom and runs back alone to pick it up. In the classroom, he finds not only his book, but Saeki''s gym uniform. On a mad impulse, he steals it.

Now everyone knows "some pervert" stole Saeki''s uniform, and Kasuga is dying with shame and guilt. Furthermore, the weird, creepy, and friendless girl of the class, Nakamura, saw him take the uniform. Instead of revealing it was him, she recognizes his kindred deviant spirit and uses her knowledge to take control of his life. Will it be possible for Kasuga to get closer to Saeki, despite Nakamura''s meddling and his dark secret? What exactly does Nakamura intend to do with him?','Flowers of Evil',19.00,2,13),
	 (10,true,'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.

After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Eren, his adopted sister Mikasa Ackerman, and his childhood friend Armin Arlert join the brutal war against the Titans and race to discover a way of defeating them before the last walls are breached.','Attack on Titan',23.00,4,18),
	 (0,true,'In an abandoned warehouse, a band of nine students have assembled to plot out a new future. Their "leader" Zera is determined to cleanse his community of the ugly and cowardly. Having taken command of a band of young men to build him a god-like machine capable of changing the world. This machine, named "Lychee," will give them what they''ve been searching for...a beauty of the finest quality.','Lychee Light Club',20.00,5,20),
	 (7,true,'Urasawa’s characters confront fantastical elements ranging from psychic powers to attacks by giant monsters. On the flip side, the author philosophizes about his real-world experiences with the wild and wacky international music scene.

Plus, a classic, funny animal tale, in Urasawa’s inimitable style!','Sneeze',15.00,6,22),
	 (5,true,'The appearance of "quirks," newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.

Since he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku''s unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might''s quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor!

Enduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year''s freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.','My Hero Academia',24.00,7,19),
	 (3,true,'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.

Enter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy''s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.','One Piece',0.00,11,27),
	 (0,true,'Fifty years ago, malevolent stones known as Dark Brings brought about the "Overdrive," a calamitous event that destroyed one-tenth of the world. In the present day, the nefarious organization Demon Card seeks the Dark Brings'' power for their all but innocent intentions.

Haru Glory, a sword-wielding silver-haired teenager, inherits the title of Rave Master: the person who wields the power of the legendary Rave Stones, artifacts capable of destroying the Dark Brings. However, the many Rave Stones were scattered across the globe as a result of the Overdrive, allowing Demon Card to continue their malpractices.

Groove Adventure Rave follows Haru, his strange dog Plue, the fiery blonde Ellie, and the infamous thief Musica, as they embark on a great journey that will take them around the vast world, searching for the Rave Stones that will finally end Demon Card''s injustice.','Rave Master',20.00,10,25);
INSERT INTO public.book (amount_purchased,available,description,title,unit_price,author_id,image_id) VALUES
	 (3,true,'In the enchanted Kingdom of Fiore, the lively Lucy Heartfilia has one wish: to join the renowned Fairy Tail—one of the many magical wizard guilds scattered around the continent. Luckily, a chance encounter with Natsu Dragneel, the "Salamander" of Fairy Tail, whisks her into the legendary guild.

From Natsu''s rivalrous antics with ice wizard Gray Fullbuster to the frightening presence of the unmatched combat goddess Erza Scarlet, Fairy Tail''s powerful mages have a slight penchant for trouble. Through all the lucrative odd jobs and adventures to save the world from destruction lies an absolute and unyielding trust stronger than family that has formed between each guild member.

Teaming up with Natsu, Gray, and Erza, Lucy finds herself amidst the guild''s most misfit wizards. But as they constantly stand in the eye of every danger, there is one name that never ceases to resurface: Zeref, the feared master of dark magic.','Fairy Tail',20.00,10,24),
	 (3,true,'Seiichi Osabe is an only child living a mundane life. Just like any middle schooler, he has friends, a crush on a girl, and loving parents. However, Seiichi''s mother is extremely overprotective, which causes others to view him as a mama''s boy.

Although he doesn''t consider her behavior to be unusual, a certain incident starts to open his eyes to just how dangerous her affection is. As Seiichi tries to break free from her grasp, he learns that his life isn''t as normal as he thought.
','Blood on the Tracks',20.00,2,26),
	 (11,true,'As the 20th century approaches its end, people all over the world are anxious that the world is changing. And probably not for the better.

Kenji Endo is a normal convenience store manager who''s just trying to get by. But when he learns that one of his old friends going by the name "Donkey" has suddenly committed suicide, and that a new cult led by a figure known as "Friend" is becoming more notorious, Kenji starts to feel that something isn''t right. With a few key clues left behind by his deceased friend, Kenji realizes that this cult is much more than he ever thought it would be—not only is this mysterious organization directly targeting him and his childhood friends, but the whole world also faces a grave danger that only the friends have the key to stop.

Kenji''s simple life of barely making ends meet is flipped upside down when he reunites with his childhood friends, and together they must figure out the truth of how their past is connected to the cult, as the turn of the century could mean the possible end of the world.','20th Century Boys',20.00,6,15),
	 (10,true,'Makoto Okazaki is an unpopular high school student who is frequently bullied by some of his classmates, being forced to act as their errand boy. But his life drastically changes one night when he is attacked by a mysterious girl, who plunges her teeth into his neck and begins drinking his blood. Upon satisfying her craving, she offers Makoto a simple choice: become like her or die.

When he wakes up in a hospital after his encounter, Makoto is unable to deal with the blindingly bright lights and finds that water cannot quench his growing thirst...','Happiness',5.00,2,23),
	 (6,true,'As a wild youth, elementary school student Shouya Ishida sought to beat boredom in the cruelest ways. When the deaf Shouko Nishimiya transfers into his class, Shouya and the rest of his class thoughtlessly bully her for fun. However, when her mother notifies the school, he is singled out and blamed for everything done to her. With Shouko transferring out of the school, Shouya is left at the mercy of his classmates. He is heartlessly ostracized all throughout elementary and middle school, while teachers turn a blind eye.

Now in his third year of high school, Shouya is still plagued by his wrongdoings as a young boy. Sincerely regretting his past actions, he sets out on a journey of redemption: to meet Shouko once more and make amends.

Koe no Katachi tells the heartwarming tale of Shouya''s reunion with Shouko and his honest attempts to redeem himself, all while being continually haunted by the shadows of his past.','A Silent Voice',22.00,3,16),
	 (8,true,'A battle is about to begin in Tokyo: the Shaman Fight, a tournament held every five hundred years where shaman—those who can command spirits—confront each other in combat. The victor of this contest becomes the Shaman King and the only one who is able to contact and control the Great Spirit, allowing them to reshape the world as they please through its immense power.

During a late night walk, Manta Oyamada runs into his classmate, the carefree You Asakura, who invites him to come stargazing with some friends, who, to Manta''s horror, turn out to be ghosts from a local cemetery! However, the knowledge that Manta possesses—a rare sixth sense that allows Manta to see these spirits—endears the boy to You. So when You finds out that his new comrade has been beaten up by a local gang, he decides to avenge him with the help of Amidamaru, a samurai ghost whose tomb was broken by the gang leader.

Soon Manta uncovers more about the world of spirits, including the Shaman Fight, in which his new friend You aims to claim victory.','Shaman King',19.00,8,21);
INSERT INTO public.book_genres (book_id,genre_id) VALUES
	 (1,4),
	 (1,2),
	 (2,4),
	 (2,2),
	 (3,4),
	 (3,2),
	 (4,2),
	 (5,4),
	 (5,2),
	 (6,1);
INSERT INTO public.book_genres (book_id,genre_id) VALUES
	 (6,3),
	 (7,5),
	 (7,3),
	 (7,2),
	 (8,1),
	 (8,3),
	 (9,5),
	 (9,2),
	 (10,1),
	 (10,3);
INSERT INTO public.book_genres (book_id,genre_id) VALUES
	 (11,2),
	 (12,3),
	 (12,2),
	 (13,1),
	 (13,3),
	 (14,1),
	 (14,3),
	 (15,2),
	 (16,1),
	 (16,3);
INSERT INTO public.book_order (author_name,book_id,image_url,quantity,title,unit_price,account_order_id) VALUES
	 ('Asano Inio',3,'http://localhost:8080/api/images/9781941220856-GirlOnTheShore.jpg?type=manga',4,'A Girl on the Shore',21.00,1),
	 ('Ooima Yoshitoki',5,'http://localhost:8080/api/images/9781632360564-768x1152.jpg?type=manga',5,'A Silent Voice',22.00,2),
	 ('Isayama Hajime',7,'http://localhost:8080/api/images/9781612620244jpg.jpg?type=manga',4,'Attack on Titan',23.00,2),
	 ('Asano Inio',1,'http://localhost:8080/api/images/917IJDfk36L.jpg?type=manga',2,'Goodnight Punpun',24.00,3),
	 ('Oshimi Shuzo',2,'http://localhost:8080/api/images/416-768x1075.jpg?type=manga',2,'Flowers of Evil',19.00,3),
	 ('Oshimi Shuzo',12,'http://localhost:8080/api/images/9781632363633.jpeg?type=manga',8,'Happiness',5.00,4),
	 ('Urasawa Naoki',11,'http://localhost:8080/api/images/1974717488.jpg?type=manga',3,'Sneeze',15.00,4),
	 ('Takei Hiroyuki',10,'http://localhost:8080/api/images/9781646593088-ShamanKing_01-768x1152.jpg?type=manga',8,'Shaman King',19.00,5),
	 ('Urasawa Naoki',4,'http://localhost:8080/api/images/1591169224.jpg?type=manga',4,'20th Century Boys',20.00,6),
	 ('Oshimi Shuzo',12,'http://localhost:8080/api/images/9781632363633.jpeg?type=manga',2,'Happiness',5.00,6);
INSERT INTO public.book_order (author_name,book_id,image_url,quantity,title,unit_price,account_order_id) VALUES
	 ('Asano Inio',3,'http://localhost:8080/api/images/9781941220856-GirlOnTheShore.jpg?type=manga',1,'A Girl on the Shore',21.00,6),
	 ('Ooima Yoshitoki',5,'http://localhost:8080/api/images/9781632360564-768x1152.jpg?type=manga',1,'A Silent Voice',22.00,6),
	 ('Urasawa Naoki',4,'http://localhost:8080/api/images/1591169224.jpg?type=manga',7,'20th Century Boys',20.00,7),
	 ('Asano Inio',3,'http://localhost:8080/api/images/9781941220856-GirlOnTheShore.jpg?type=manga',4,'A Girl on the Shore',21.00,8),
	 ('Oshimi Shuzo',15,'http://localhost:8080/api/images/9781949980134-768x1047.jpg?type=manga',3,'Blood on the Tracks',20.00,8),
	 ('Isayama Hajime',7,'http://localhost:8080/api/images/9781612620244jpg.jpg?type=manga',6,'Attack on Titan',23.00,9),
	 ('Mashima Hiro',13,'http://localhost:8080/api/images/9781612622767-768x1152.jpg?type=manga',3,'Fairy Tail',20.00,10),
	 ('Oshimi Shuzo',2,'http://localhost:8080/api/images/416-768x1075.jpg?type=manga',3,'Flowers of Evil',19.00,10),
	 ('Urasawa Naoki',11,'http://localhost:8080/api/images/1974717488.jpg?type=manga',4,'Sneeze',15.00,11),
	 ('Oda Eiichiro',16,'http://localhost:8080/api/images/73245.jpg?type=manga',3,'One Piece',0.00,11);
INSERT INTO public.book_order (author_name,book_id,image_url,quantity,title,unit_price,account_order_id) VALUES
	 ('Horikoshi Kouhei',8,'http://localhost:8080/api/images/87572.jpg?type=manga',5,'My Hero Academia',24.00,12);
