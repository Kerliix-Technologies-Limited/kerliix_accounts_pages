import { FiUsers, FiUserPlus, FiUserCheck, FiUserX, FiShield } from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts';

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

const activeInactiveData = [
  { name: 'Active Users', count: 876 },
  { name: 'Inactive Users', count: 404 },
];

const userStatusData = [
  { name: 'Active', value: 1000 },
  { name: 'Inactive', value: 200 },
  { name: 'Suspended', value: 50 },
  { name: 'Deactivated', value: 30 },
];

const signupsBySourceData = [
  { name: 'Organic', value: 600 },
  { name: 'Ads', value: 400 },
  { name: 'Referrals', value: 200 },
  { name: 'Other', value: 80 },
];

// Simple heatmap data (login count by day of week and hour)
const heatmapData = [
  { day: 1, hour: 9, count: 5 },
  { day: 1, hour: 10, count: 10 },
  { day: 2, hour: 14, count: 20 },
  { day: 3, hour: 18, count: 15 },
  // Add more as needed...
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// LoginHeatmap component matching Dashboard style
function LoginHeatmap() {
  const maxCount = Math.max(...heatmapData.map(d => d.count), 1);
  const getColor = (count) => {
    if (!count) return '#222'; // no data color
    const intensity = Math.min(255, Math.floor((count / maxCount) * 255));
    return `rgba(0, 136, 254, ${intensity / 255})`; // blue with opacity
  };

  return (
    <div>
      {/* Hours header */}
      <div className="flex ml-12 mb-1 space-x-0.5">
        {[...Array(24).keys()].map(hour => (
          <div key={hour} className="w-4 text-xs text-white/50 text-center">{hour}</div>
        ))}
      </div>
      {/* Days rows */}
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

// Custom label for Pie charts
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Analytics</h1>
      <p className="text-white/80 mb-8">
        Analyze user activity, growth trends, and performance metrics.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

      {/* Graphs Section */}
      <div className="space-y-10">
        {/* User Growth Over Time */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">User Growth Over Time</h2>
          <LineChart
            width={800}
            height={300}
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

        {/* Active vs Inactive Users */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Active vs Inactive Users</h2>
          <BarChart width={800} height={300} data={activeInactiveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </section>

        {/* Pie Charts Horizontal Layout */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">User Status & Signups Source</h2>
          <div className="flex gap-6 flex-wrap">

            {/* User Status Breakdown */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-white shadow hover:shadow-lg transition w-[420px]">
              <h3 className="text-lg font-semibold mb-2">User Status</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={userStatusData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={renderPieLabel}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* New Signups by Source */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-white shadow hover:shadow-lg transition w-[420px]">
              <h3 className="text-lg font-semibold mb-2">New Signups by Source</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={signupsBySourceData}
                  cx={200}
                  cy={150}
                  innerRadius={50}
                  outerRadius={90}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                  label={renderPieLabel}
                >
                  {signupsBySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </section>

        {/* Login Activity Heatmap */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Login Activity Heatmap</h2>
          <div className="bg-white/10 border border-white/20 rounded-lg p-4 max-w-[900px]">
            <LoginHeatmap />
          </div>
        </section>
      </div>
    </div>
  );
}
