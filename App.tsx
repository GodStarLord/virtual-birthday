import React, { useState, useCallback } from "react";
import { Scene } from "./types";
import SceneCurtains from "./components/SceneCurtains";
import SceneBirthdayRoom from "./components/SceneBirthdayRoom";
import SceneCake from "./components/SceneCake";
import SceneGift from "./components/SceneGift";
import SceneLoveStory from "./components/SceneLoveStory";
import SceneLongDistance from "./components/SceneLongDistance";
import SceneTimeline from "./components/SceneTimeline";
import SceneReunion from "./components/SceneReunion";
import SceneFinalWish from "./components/SceneFinalWish";
import SceneClosingCurtains from "./components/SceneClosingCurtains";

const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>(Scene.Curtains);

  const nextScene = useCallback(() => {
    setScene((prev) => {
      if (prev === Scene.FinalWish) return Scene.ClosingCurtains;
      if (prev === Scene.ClosingCurtains) return Scene.ClosingCurtains; // End of story
      return prev + 1;
    });
  }, []);

  const renderScene = () => {
    switch (scene) {
      case Scene.Curtains:
        return <SceneCurtains onNextScene={nextScene} />;
      case Scene.BirthdayRoom:
        return <SceneBirthdayRoom onNextScene={nextScene} />;
      case Scene.Cake:
        return <SceneCake onNextScene={nextScene} />;
      case Scene.Gift:
        return <SceneGift onNextScene={nextScene} />;
      case Scene.LoveStory:
        return <SceneLoveStory onNextScene={nextScene} />;
      case Scene.LongDistance:
        return <SceneLongDistance onNextScene={nextScene} />;
      case Scene.Timeline:
        return <SceneTimeline onNextScene={nextScene} />;
      case Scene.Reunion:
        return <SceneReunion onNextScene={nextScene} />;
      case Scene.FinalWish:
        return <SceneFinalWish onNextScene={nextScene} />;
      case Scene.ClosingCurtains:
        return <SceneClosingCurtains />;
      default:
        return <SceneCurtains onNextScene={nextScene} />;
    }
  };

  return (
    <main className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-rose-900 text-white overflow-hidden">
      <div className="relative w-full h-full">{renderScene()}</div>
    </main>
  );
};

export default App;
