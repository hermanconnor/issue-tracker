"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar dataKey="value" barSize={60} className="fill-purple-500" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IssuesChart;
