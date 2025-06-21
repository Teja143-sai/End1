// ... (previous imports remain the same)

// Lazy load components for better performance
const Profile = lazy(() => import('./components/Profile'));
const DashboardSettings = lazy(() => import('./components/dashboard/Settings'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./components/NotFound'));

// ... (rest of the file remains the same until the routes section)

              {/* Settings Page */}
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              {/* Protected routes with role-based access */}
              {/* Interviewer Routes */}
              <Route path="/interviewer">
                {/* ... other routes ... */}
                <Route path="settings" element={<DashboardSettings />} />
                {/* ... other routes ... */}
              </Route>
              
              {/* Interviewee Routes */}
              <Route path="/interviewee">
                {/* ... other routes ... */}
                <Route path="settings" element={<DashboardSettings />} />
                {/* ... other routes ... */}
              </Route>
