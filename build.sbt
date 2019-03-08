name := """poe-item-filter"""
organization := "valde"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
// https://mvnrepository.com/artifact/io.circe/circe-core
libraryDependencies += "io.circe" %% "circe-core" % "0.11.1"
// https://mvnrepository.com/artifact/io.circe/circe-parser
libraryDependencies += "io.circe" %% "circe-parser" % "0.11.1"
// https://mvnrepository.com/artifact/io.circe/circe-generic
libraryDependencies += "io.circe" %% "circe-generic" % "0.11.1"




// Adds additional packages into Twirl
//TwirlKeys.templateImports += "valde.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "valde.binders._"
