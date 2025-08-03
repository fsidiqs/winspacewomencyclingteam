import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";
import Player, { PlayerProps } from "../components/Player/Player";
import { apiRequest } from "../admin/lib/api";
import Navigation from "@/components/Navigation/Navigation";

export default function Cyclist() {
  const { riderId } = useParams<{ riderId: string }>();
  const [player, setPlayer] = useState<PlayerProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!riderId) return;
    setLoading(true);
    apiRequest(`/api/riders/${riderId}`, "GET")
      .then((data) => {
        setPlayer({
          name: data.name,
          image: data.photo,
          nationality: data.nationality,
          birthday: data.date_of_birth,
          info: {
            bio_en: data.info?.bio_en || "",
            bio_fr: data.info?.bio_fr || "",
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [riderId]);

  return (
    <>
      <Navigation />
      <Breadcrumbs
        title={player?.name || "Player Name"}
        items={["Home", "The Team", player?.name || "Player Name"]}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {player && <Player {...player} />}
      <Footer />
    </>
  );
}
