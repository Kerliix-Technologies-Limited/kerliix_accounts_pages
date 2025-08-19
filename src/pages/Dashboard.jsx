import { FiUsers, FiUserPlus, FiUserCheck, FiUserX, FiShield } from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import { useMemo } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const userGrowthData = [
  { date: '2025-07-01', signups: 10 },
  { date: '2025-07-02', signups: 15 },
  { date: '2025-07-03', signups: 12 },
  { date: '2025-07-04', signups: 20 },
  { date: '2025-07-05', signups: 18 },
  { date: '2025-07-06', signups: 25 },
  { date: '2025-07-07', signups: 22 },
];

const signupsBySourceData = [
  { name: 'Organic', value: 600 },
  { name: 'Ads', value: 400 },
  { name: 'Referrals', value: 200 },
  { name: 'Other', value: 80 },
];

const heatmapData = [
  { day: 1, hour: 9, count: 5 },
  { day: 1, hour: 10, count: 10 },
  { day: 2, hour: 14, count: 20 },
  { day: 3, hour: 18, count: 15 },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function LoginHeatmap() {
  const maxCount = useMemo(() => Math.max(...heatmapData.map(d => d.count), 1), []);
  const getColor = (count) => {
    if (!count) return '#222'; // no data
    const intensity = Math.min(255, Math.floor((count / maxCount) * 255));
    return `rgba(0, 136, 254, ${intensity / 255})`;
  };

  return (
    <div>
      <div className="flex ml-12 mb-1 space-x-0.5">
        {[...Array(24).keys()].map(hour => (
          <div key={hour} className="w-4 text-xs text-white/50 text-center">{hour}</div>
        ))}
      </div>
      {days.map((day, dayIdx) => (
        <div key={day} className="flex items-center gap-2 mb-1">
          <div className="w-10 text-xs text-white/70">{day}</div>
          <div className="flex flex-wrap flex-1">
            {Array.from({ length: 24 }, (_, hour) => {
              const dataPoint = heatmapData.find(d => d.day === dayIdx && d.hour === hour);
              return (
                <div
                  key={`${dayIdx}-${hour}`}
                  className="w-4 h-4 m-0.5 rounded-sm"
                  style={{ backgroundColor: getColor(dataPoint?.count) }}
                  title={`${day} ${hour}:00 - ${dataPoint?.count || 0} logins`}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/80">
          Welcome to your dashboard! Here you can view your activity, insights, and more.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-5 text-white shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Users</p>
              <h2 className="text-xl font-semibold">1,280</h2>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-5 text-white shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20 text-green-400">
              <FiUserCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-white/60">Active Users</p>
              <h2 className="text-xl font-semibold">876</h2>
            </div>
          </div>
        </div>

        {/* New Signups (Today) */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-5 text-white shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
              <FiUserPlus size={24} />
            </div>
            <div>
              <p className="text-sm text-white/60">New Signups (Today)</p>
              <h2 className="text-xl font-semibold">34</h2>
            </div>
          </div>
        </div>

        {/* Deactivated Accounts */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-5 text-white shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
              <FiUserX size={24} />
            </div>
            <div>
              <p className="text-sm text-white/60">Deactivated Accounts</p>
              <h2 className="text-xl font-semibold">12</h2>
            </div>
          </div>
        </div>

        {/* Active Admins */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-5 text-white shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
              <FiShield size={24} />
            </div>
            <div>
              <p className="text-sm text-white/60">Active Admins</p>
              <h2 className="text-xl font-semibold">5</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        {/* User Growth Over Time */}
        <section className="flex-1">
          <h3 className="text-xl font-bold text-white mb-4">User Growth Over Time</h3>
          <LineChart
            width={400}
            height={250}
            data={userGrowthData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="signups" stroke="#0088FE" strokeWidth={2} />
          </LineChart>
        </section>

        {/* New Signups by Source */}
        <section className="flex-1">
          <h3 className="text-xl font-bold text-white mb-4">New Signups by Source</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={signupsBySourceData}
              cx={200}
              cy={125}
              innerRadius={50}
              outerRadius={90}
              fill="#82ca9d"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {signupsBySourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {/* Legend below the pie chart */}
          <div className="flex justify-center mt-2 space-x-4 text-white text-sm">
            {signupsBySourceData.map((source, idx) => (
              <div key={source.name} className="flex items-center space-x-1">
                <span
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span>{source.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Login Activity Heatmap */}
      <section className="mt-10">
        <h3 className="text-xl font-bold text-white mb-4">Login Activity Heatmap</h3>
        <div className="bg-white/10 border border-white/20 rounded-lg p-4 max-w-[900px]">
          <LoginHeatmap />
        </div>
      </section>
    </div>
  );
}
